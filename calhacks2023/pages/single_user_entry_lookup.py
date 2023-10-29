from calhacks2023.templates import template

import reflex as rx

from calhacks2023.state import State
import pandas as pd



class FormState(State):

    form_data: dict = {}
    output = pd.DataFrame({'Name':[], 'Email':[], 'Task':[], 'Day':[], 'Time_Start':[], 'Time_End':[]})
    dat = pd.read_csv("calhacks2023/pages/data.csv")
    def handle_submit(self, form_data: dict):
        """Handle the form submit."""
        self.form_data = form_data
        if self.form_data["get"]:
            self.output = self.dat.loc[self.dat["Name"] == self.form_data["name"]].loc[self.dat["Email"] == self.form_data["email"]]
        else:
            new_record = pd.DataFrame([{'Name':self.form_data["name"], 'Email':self.form_data["email"],
                                        'Task': self.form_data["task"],'Day': self.form_data["date"],
                                        'Time_Start': self.form_data["start"],'Time_End': self.form_data["end"]}])
            self.dat = pd.concat([self.dat, new_record], ignore_index=True)
            self.dat.to_csv("calhacks2023/pages/data.csv", index = False)
            self.output = self.dat.loc[self.dat["Name"] == self.form_data["name"]].loc[self.dat["Email"] == self.form_data["email"]]



@template(route="/single_user_entry_lookup", title="Single User Entry and Lookup")
def single_user_entry_lookup():
    return rx.vstack( 
        rx.text(
            "Welcome to your Custom Task Manager",
            background_image="linear-gradient(271.68deg, #EE756A 0.75%, #8ad2ff 88.52%)",
            background_clip="text",
            font_weight="bold",
            font_size="2em",
        ),
        rx.form(
            rx.vstack(
                rx.input(
                    placeholder="Name",
                    id="name",
                ),
                rx.input(
                    placeholder="Email", id="email"
                ),
                rx.input(
                    placeholder="Task", id="task"
                ),
                rx.hstack(rx.input(
                    placeholder="Date", id="date", type_="date"
                    ),
                    rx.input(
                        placeholder="Time Start", id="start", type_="time"
                    ),
                    rx.input(
                        placeholder="Time End", id="end", type_="time"
                    )
                ),
                rx.hstack(
                    rx.checkbox("Clicking This Won't Add More Data", id="get"),
                ),
                rx.button("Submit", type_="submit"),
            ),
            on_submit=FormState.handle_submit,
        ),
        rx.divider(),
        rx.data_table(data = FormState.output,
                        pagination=True,
                        search=True,
                        sort=True),
    )