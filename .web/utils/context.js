import { createContext, useState } from "react"
import { Event, hydrateClientStorage, useEventLoop } from "/utils/state.js"

export const initialState = {"form_state": {"dat": {"columns": ["Name", "Email", "Task", "Day", "Time_Start", "Time_End"], "data": [["Daisy", "daisyw2003@hotmail.com", "Sleep", "2023-10-29", "5:00", "17:00"], ["Kaylie", "something@gmail.com", "Eat", "2023-10-28", "10:00", "12:00"], ["Daisy", "daisyw2003@berkeley.edu", "Play", "2023-10-29", "8:00", "18:00"], ["Wenyi", "Wenyi@berkeley.edu", "Black Out", "2023-10-29", "13:00", "15:00"], ["daisy", "daisyw2003@berkeley.edu", "arf arf", "2023-11-01", NaN, NaN], ["kaylie", "kaylieching@berkeley.edu", "oink oink", "2023-10-11", NaN, NaN], ["daisy", "daisywang2003@berkeley.edu", "meowwww", "2023-10-31", NaN, NaN]]}, "form_data": {}, "output": {"columns": ["Name", "Email", "Task", "Day", "Time_Start", "Time_End"], "data": []}}, "is_hydrated": false, "list_state": {"items": ["Write Code", "Sleep", "Have Fun"], "new_item": ""}, "query_form": {"dat": {"columns": ["Name", "Email", "Task", "Day", "Time_Start", "Time_End"], "data": [["Daisy", "daisyw2003@hotmail.com", "Sleep", "2023-10-29", "5:00", "17:00"], ["Kaylie", "something@gmail.com", "Eat", "2023-10-28", "10:00", "12:00"], ["Daisy", "daisyw2003@berkeley.edu", "Play", "2023-10-29", "8:00", "18:00"], ["Wenyi", "Wenyi@berkeley.edu", "Black Out", "2023-10-29", "13:00", "15:00"], ["daisy", "daisyw2003@berkeley.edu", "arf arf", "2023-11-01", NaN, NaN], ["kaylie", "kaylieching@berkeley.edu", "oink oink", "2023-10-11", NaN, NaN], ["daisy", "daisywang2003@berkeley.edu", "meowwww", "2023-10-31", NaN, NaN]]}, "form_data": {}, "output": {"columns": ["Name", "Email", "Task", "Day", "Time_Start", "Time_End"], "data": []}}, "router": {"session": {"client_token": "", "client_ip": "", "session_id": ""}, "headers": {"host": "", "origin": "", "upgrade": "", "connection": "", "pragma": "", "cache_control": "", "user_agent": "", "sec_websocket_version": "", "sec_websocket_key": "", "sec_websocket_extensions": "", "accept_encoding": "", "accept_language": ""}, "page": {"host": "", "path": "", "raw_path": "", "full_path": "", "full_raw_path": "", "params": {}}}}

export const ColorModeContext = createContext(null);
export const StateContext = createContext(null);
export const EventLoopContext = createContext(null);
export const clientStorage = {"cookies": {}, "local_storage": {}}

export const initialEvents = () => [
    Event('state.hydrate', hydrateClientStorage(clientStorage)),
]

export const isDevMode = true

export function EventLoopProvider({ children }) {
  const [state, addEvents, connectError] = useEventLoop(
    initialState,
    initialEvents,
    clientStorage,
  )
  return (
    <EventLoopContext.Provider value={[addEvents, connectError]}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </EventLoopContext.Provider>
  )
}