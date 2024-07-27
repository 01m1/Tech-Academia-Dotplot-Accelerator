install.packages(c("tidyr"))
library(shiny)
library(ggplot2)
library(plotly)
library(dplyr)
library(tidyr)
library(DT)

# Load the datasets
us_scans <- read.csv("US_scans.csv")
patients <- read.csv("Patients.csv")

# Ensure 'US.scan.ID' is a character type for merging
us_scans$US.scan.ID <- as.character(us_scans$US.scan.ID)
patients$US.scan.ID <- as.character(patients$US.scan.ID)

# Split 'US.scan.ID' in 'patients' dataset into separate rows
patients_split <- patients %>%
  mutate(US.scan.ID = strsplit(US.scan.ID, " ")) %>%
  unnest(cols = c(US.scan.ID))

# Merge datasets
data <- merge(us_scans, patients_split, by = "US.scan.ID", all = TRUE)

# Print merged data
cat("Merged Data:\n")
print(head(data))

# Shiny UI
ui <- fluidPage(
  titlePanel("Patient Data Dashboard"),
  sidebarLayout(
    sidebarPanel(
      selectInput("var_x", "X-axis Variable:", 
                  choices = c("Age", "Height..cm.", "Weight..kg.")),
      selectInput("var_y", "Y-axis Variable:", 
                  choices = c("Age", "Height..cm.", "Weight..kg.")),
      textInput("search", "Search by Patient Name or ID:"),
      checkboxGroupInput("diagnosis_filter", "Diagnosis:", 
                         choices = c("Benign", "Malignant"),
                         selected = c("Benign", "Malignant")),
      dateRangeInput("scan_date", "Scan Date Range:", 
                     start = min(as.Date(data$Scan.Date, "%d/%m/%Y"), na.rm = TRUE), 
                     end = max(as.Date(data$Scan.Date, "%d/%m/%Y"), na.rm = TRUE))
    ),
    mainPanel(
      tabsetPanel(
        tabPanel("Scatter Plot", plotlyOutput("scatterPlot")),
        tabPanel("Summary Stats", textOutput("summaryStats")),
        tabPanel("Histograms", plotOutput("histogram")),
        tabPanel("Patient Details", DTOutput("patientTable"))
      )
    )
  )
)

# Shiny server
server <- function(input, output, session) {
  filtered_data <- reactive({
    data_filtered <- data
    if (input$search != "") {
      data_filtered <- data_filtered %>%
        filter(grepl(input$search, Patient.ID, ignore.case = TRUE) | 
                 grepl(input$search, Patient.Name, ignore.case = TRUE))
    }
    data_filtered <- data_filtered %>%
      filter(Diagnosis %in% input$diagnosis_filter) %>%
      filter(as.Date(Scan.Date, "%d/%m/%Y") >= input$scan_date[1] & as.Date(Scan.Date, "%d/%m/%Y") <= input$scan_date[2])
    
    # Debugging prints
    cat("Filtered Data:\n")
    print(head(data_filtered))
    cat("Unique Diagnoses in Filtered Data:\n")
    print(unique(data_filtered$Diagnosis))
    
    data_filtered
  })
  
  output$scatterPlot <- renderPlotly({
    p <- ggplot(filtered_data(), aes_string(x=input$var_x, y=input$var_y, color="Diagnosis", 
                                            text="paste('ID:', Patient.ID, '<br>Name:', Patient.Name, '<br>Age:', Age, '<br>Height:', Height..cm., '<br>Weight:', Weight..kg.)")) +
      geom_point() +
      theme_minimal()
    ggplotly(p, tooltip="text")
  })
  
  output$summaryStats <- renderText({
    data <- filtered_data()
    if(nrow(data) == 0) {
      return("No data available for the selected filters.")
    }
    paste("Total Patients:", nrow(data), "\n",
          "Average Age:", round(mean(data$Age, na.rm = TRUE), 2), "\n",
          "Average Height:", round(mean(data$Height..cm., na.rm = TRUE), 2), "\n",
          "Average Weight:", round(mean(data$Weight..kg., na.rm = TRUE), 2))
  })
  
  output$histogram <- renderPlot({
    ggplot(filtered_data(), aes(x=Age)) +
      geom_histogram(binwidth=5) +
      facet_wrap(~Diagnosis) +
      theme_minimal()
  })
  
  output$patientTable <- renderDT({
    datatable(
      filtered_data(),
      selection = "single",
      options = list(pageLength = 10, autoWidth = TRUE),
      callback = JS(
        "table.on('click.dt', 'tr', function() {",
        "  var data = table.row(this).data();",
        "  Shiny.setInputValue('selected_row', data[0]);",
        "});"
      )
    )
  })
  
  observeEvent(input$selected_row, {
    selected_row <- input$selected_row
    if (!is.null(selected_row)) {
      selected_data <- filtered_data() %>%
        filter(Patient.ID == selected_row)
      
      showModal(modalDialog(
        title = "Patient Details",
        renderTable(selected_data, rows = NULL, colnames = TRUE),
        easyClose = TRUE,
        footer = modalButton("Close")
      ))
    }
  })
}

shinyApp(ui, server)
