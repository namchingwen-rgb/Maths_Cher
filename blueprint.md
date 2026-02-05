# SG Math Quest - Blueprint

## Overview

SG Math Quest is a web application designed to generate primary school mathematics test papers based on the Singapore MOE Syllabus for levels P1 to P6. It provides a simple interface for parents and educators to create practice materials for students.

## Features & Design

### Initial Version

*   **UI:**
    *   Clean and modern interface with a clear title.
    *   Dropdown menu to select the primary school level (P1 to P6).
    *   "Generate" button to create a new test paper.
    *   A dedicated area to display the generated test paper.
    *   Responsive design for both desktop and mobile use.
*   **Functionality:**
    *   Generates a set of math questions based on the selected level.
    *   For the initial version, the question generation will be simple, focusing on basic arithmetic.
*   **Styling:**
    *   Use of CSS variables for easy theming.
    *   Modern color palette and typography.
    *   Subtle use of drop shadows and gradients for a polished look.
*   **Technology:**
    *   Framework-less vanilla HTML, CSS, and JavaScript.
    *   Use of Web Components for UI elements.

### Future Enhancements

*   **Question Variety:** Include a wider range of question types (e.g., word problems, geometry, fractions).
*   **Syllabus Coverage:** Ensure comprehensive coverage of the Singapore MOE syllabus for all levels.
*   **Answer Key:** Option to generate an answer key for the test paper.
*   **Printing:** A feature to print the generated test paper in a clean format.
*   **User Accounts:** Allow users to save generated papers and track progress.
*   **3D/Interactive Elements:** Potentially use Three.js for more engaging, interactive questions.

## Current Plan: Initial Implementation

1.  **Create `blueprint.md`:** Document the project plan.
2.  **Update `index.html`:**
    *   Set the title to "SG Math Quest".
    *   Add a header for the application title.
    *   Create a controls section with a level selector dropdown and a "Generate Test" button.
    *   **Add a timer display (`div id="timer-display"`) and "Start Test" (`button id="start-timer-btn"`) and "End Test" (`button id="end-timer-btn"`) buttons within the `.controls` section.**
    *   Add a container element where the generated test paper will be displayed.
3.  **Update `style.css`:**
    *   Apply a modern design aesthetic.
    *   Style the header, controls, and test paper container.
    *   **Add styles for the timer display and the new timer control buttons.**
    *   Ensure the layout is responsive.
4.  **Update `main.js`:**
    *   Implement a `QuestionGenerator` class.
    *   Create a web component for the question paper.
    *   Add an event listener to the "Generate Test" button.
    *   When the button is clicked, generate questions based on the selected level and display them in the test paper container.
    *   **Implement timer functionality:**
        *   **Declare variables for timer display, start button, and end button.**
        *   **Create `formatTime` function to display time as MM:SS.**
        *   **Create `updateTimerDisplay` function to update the timer's text content.**
        *   **Create `startTimer` function to initialize and start a 15-minute countdown, handling button states (disabling Start, enabling End) and an alert when time is up.**
        *   **Create `stopTimer` function to stop the timer, reset button states, and display an alert with remaining time.**
        *   **Add event listeners to "Start Test" and "End Test" buttons.**
        *   **Ensure the timer display is updated initially on page load.**
        *   **Reset timer to initial state if a new test is generated while the timer is not running.**


