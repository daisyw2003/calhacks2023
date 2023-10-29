"""The dashboard page."""
from calhacks2023.templates import template

import reflex as rx


@template(route="/dashboard", title="Dashboard")
def dashboard() -> rx.Component:
    return rx.vstack(
        rx.heading("This is a mock visual of what a calendar might look like but with boxes XD", font_size="3em"),
        rx.hstack(
            rx.vstack(
                rx.box(
                    "Task1", bg="pink", w="200px", h="80px"
                ),
                rx.box(
                    "Task2 - much longer", bg="lightblue", w="200px", h="200px"
                )
            ),
            rx.vstack(
                rx.box(
                    "Day 2 Task 1", bg="lavender", w="200px", h="100px"
                ),
                rx.box(
                    rx.text("this would represent a break", text_align = "center"), bg="white", w="200px", h="220px"
                ),
                rx.box(
                    "Day 2 Task 2", bg="orange", w="200px", h="150px"
                )
            )
        )
)
    
        
