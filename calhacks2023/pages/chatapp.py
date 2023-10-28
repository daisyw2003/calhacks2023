from calhacks2023.templates import template

import reflex as rx
import pandas as pd


df = pd.DataFrame({"Name":["Daisy", "Daisy", "Kaylie"], "Task":["Stat HW", "Math HW", "Fluids HW"], "Day":["Oct-27", "Oct-27", "Oct-27"]})

@template(route="/chatapp", title="ChatApp")

def chatapp() -> rx.Component:
    user_input = rx.state('')
    
    def handle_search():
        # Filter the DataFrame based on the user's input
        search_term = user_input.get()
        result = df[df['Name'].str.contains(search_term, case=False)]
        
        # Render the search result
        return rx.div(
            rx.h3("Search Result:"),
            rx.table(result),
        )
    
    return rx.div(
        rx.h1("User Input Example"),
        rx.input(
            type="text",
            placeholder="Search by Name",
            value=user_input,
        ),
        rx.button("Search", on_click=handle_search),
    )