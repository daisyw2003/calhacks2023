from calhacks2023.templates import template
import pandas as pd
import reflex as rx
from calhacks2023.state import State

class QueryForm(State):

    form_data: dict = {}
    output = pd.DataFrame({'Name':[], 'Email':[], 'Task':[], 'Day':[], 'Time_Start':[], 'Time_End':[]})
    dat = pd.read_csv("calhacks2023/pages/data.csv")
    
    def handle_submit(self, form_data: dict):
        """Handle the form submit."""
        self.form_data = form_data
        self.output = pd.DataFrame({'Name':[], 'Email':[], 'Task':[], 'Day':[], 'Time_Start':[], 'Time_End':[]})
        name_list = self.form_data["name"].split(",")
        email_list = self.form_data["email"].split(",")

        for name, email in zip(name_list, email_list):
            temp_name = name.strip()
            temp_email = email.strip()
            new_record = self.dat.loc[self.dat["Name"] == temp_name].loc[self.dat["Email"] == temp_email]
            self.output = pd.concat([self.output, new_record], ignore_index = True)
       

@template(route="/multi_user_lookup", title="Multi-User Lookup")
def multi_user_lookup():
    return rx.vstack( 
        rx.text(
            "Look Up Your Friends' and Your Tasks",
            background_image="linear-gradient(271.68deg, #EE756A 0.75%, #8ad2ff 88.52%)",
            background_clip="text",
            font_weight="bold",
            font_size="2em",
        ),
        rx.text("Please separate names and emails with commas"),
        rx.form(
            rx.vstack(
                rx.input(
                    placeholder="Name", id="name"),
                rx.input(
                    placeholder="Email", id="email"),
                rx.button("Submit", type_="submit"),
            ),
            on_submit=QueryForm.handle_submit,
        ),
        rx.divider(),
        rx.data_table(data = QueryForm.output,
                        pagination=True,
                        search=True,
                        sort=True),
    )