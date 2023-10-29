"""The dashboard page."""
from calhacks2023.templates import template

import reflex as rx
from typing import List
from calhacks2023.state import State

class ListState(State):
    items: List[str] = ["Write Code", "Sleep", "Have Fun"]
    new_item: str

    def add_item(self):
        self.items += [self.new_item]

    def finish_item(self, item: str):
        self.items = [i for i in self.items if i != item]


def get_item(item):
    return rx.list_item(
        rx.hstack(
            rx.button(
                on_click=lambda: ListState.finish_item(
                    item
                ),
                height="1.5em",
                background_color="white",
                border="1px solid blue",
            ),
            rx.text(item, font_size="1.25em"),
        ),
    )


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
        ),
        rx.heading("This is a mock visual of what checking off a task might look like -- we would be accessing it from our databse that you can pull up from the other pages", font_size="3em"),
        rx.text("we would make it so each of these tasks listed belows has a box like the ones above"),
        rx.text("instead of disappearing, it would simply fade so you can always look back at what tasks you've done"),
        rx.vstack(
        rx.heading("Tasks"),
        rx.input(
            on_blur=ListState.set_new_item,
            placeholder="Add a todo...",
            bg="white",
        ),
        rx.button(
            "Add", on_click=ListState.add_item, bg="white"
        ),
        rx.divider(),
        rx.ordered_list(
            rx.foreach(
                ListState.items,
                get_item,
            ),
        ),
        bg="#ededed",
        padding="1em",
        border_radius="0.5em",
        shadow="lg",
    )
)
    
        
