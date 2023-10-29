import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Button, Center, Divider, Heading, HStack, Image, Input, Link, ListItem, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, OrderedList, Spacer, Text, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextLink from "next/link"
import { HamburgerIcon } from "@chakra-ui/icons"
import NextHead from "next/head"



export default function Component() {
  const state = useContext(StateContext)
  const router = useRouter()
  const [ colorMode, toggleColorMode ] = useContext(ColorModeContext)
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents())
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])


  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getEventURL().href}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <HStack alignItems={`flex-start`} sx={{"transition": "left 0.5s, width 0.5s", "position": "relative"}}>
  <Box sx={{"display": ["none", "none", "block"], "minWidth": "20em", "height": "100%", "position": "sticky", "top": "0px", "borderRight": "1px solid #F4F3F6"}}>
  <VStack sx={{"height": "100dvh"}}>
  <HStack sx={{"width": "100%", "borderBottom": "1px solid #F4F3F6", "padding": "1em"}}>
  <Image src={`/icon.svg`} sx={{"height": "2em"}}/>
  <Spacer/>
  <Link as={NextLink} href={`https://github.com/reflex-dev/reflex`}>
  <Center sx={{"boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "bg": "transparent", "borderRadius": "0.375rem", "_hover": {"bg": "#F5EFFE"}}}>
  <Image src={`/github.svg`} sx={{"height": "3em", "padding": "0.5em"}}/>
</Center>
</Link>
</HStack>
  <VStack alignItems={`flex-start`} sx={{"width": "100%", "overflowY": "auto", "padding": "1em"}}>
  <Link as={NextLink} href={`/`} sx={{"width": "100%"}}>
  <HStack sx={{"bg": isTrue((state.router.page.path === "/home") || (((state.router.page.path === "/") && "Home") === "Home")) ? `#F5EFFE` : `transparent`, "color": isTrue((state.router.page.path === "/home") || (((state.router.page.path === "/") && "Home") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <Image src={`/github.svg`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`Home`}
</Text>
</HStack>
</Link>
  <Link as={NextLink} href={`/dashboard`} sx={{"width": "100%"}}>
  <HStack sx={{"bg": isTrue((state.router.page.path === "/dashboard") || (((state.router.page.path === "/") && "Dashboard") === "Home")) ? `#F5EFFE` : `transparent`, "color": isTrue((state.router.page.path === "/dashboard") || (((state.router.page.path === "/") && "Dashboard") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <Image src={`/github.svg`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`Dashboard`}
</Text>
</HStack>
</Link>
  <Link as={NextLink} href={`/multi_user_lookup`} sx={{"width": "100%"}}>
  <HStack sx={{"bg": isTrue((state.router.page.path === "/multi-user lookup") || (((state.router.page.path === "/") && "Multi-User Lookup") === "Home")) ? `#F5EFFE` : `transparent`, "color": isTrue((state.router.page.path === "/multi-user lookup") || (((state.router.page.path === "/") && "Multi-User Lookup") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <Image src={`/github.svg`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`Multi-User Lookup`}
</Text>
</HStack>
</Link>
  <Link as={NextLink} href={`/single_user_entry_lookup`} sx={{"width": "100%"}}>
  <HStack sx={{"bg": isTrue((state.router.page.path === "/single user entry and lookup") || (((state.router.page.path === "/") && "Single User Entry and Lookup") === "Home")) ? `#F5EFFE` : `transparent`, "color": isTrue((state.router.page.path === "/single user entry and lookup") || (((state.router.page.path === "/") && "Single User Entry and Lookup") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <Image src={`/github.svg`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`Single User Entry and Lookup`}
</Text>
</HStack>
</Link>
</VStack>
  <Spacer/>
  <HStack sx={{"width": "100%", "borderTop": "1px solid #F4F3F6", "padding": "1em"}}>
  <Spacer/>
  <Link as={NextLink} href={`https://reflex.dev/docs/getting-started/introduction/`}>
  <Text>
  {`Docs`}
</Text>
</Link>
  <Link as={NextLink} href={`https://reflex.dev/blog/`}>
  <Text>
  {`Blog`}
</Text>
</Link>
</HStack>
</VStack>
</Box>
  <Box sx={{"paddingTop": "5em", "paddingX": ["auto", "2em"]}}>
  <Box sx={{"width": "100%", "alignItems": "flex-start", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "borderRadius": "0.375rem", "padding": "1em", "marginBottom": "2em"}}>
  <VStack>
  <Heading sx={{"fontSize": "3em"}}>
  {`This is a mock visual of what a calendar might look like but with boxes XD`}
</Heading>
  <HStack>
  <VStack>
  <Box sx={{"bg": "pink", "w": "200px", "h": "80px"}}>
  {`Task1`}
</Box>
  <Box sx={{"bg": "lightblue", "w": "200px", "h": "200px"}}>
  {`Task2 - much longer`}
</Box>
</VStack>
  <VStack>
  <Box sx={{"bg": "lavender", "w": "200px", "h": "100px"}}>
  {`Day 2 Task 1`}
</Box>
  <Box sx={{"bg": "white", "w": "200px", "h": "220px"}}>
  <Text sx={{"textAlign": "center"}}>
  {`this would represent a break`}
</Text>
</Box>
  <Box sx={{"bg": "orange", "w": "200px", "h": "150px"}}>
  {`Day 2 Task 2`}
</Box>
</VStack>
</HStack>
  <Heading sx={{"fontSize": "3em"}}>
  {`This is a mock visual of what checking off a task might look like -- we would be accessing it from our databse that you can pull up from the other pages`}
</Heading>
  <Text>
  {`we would make it so each of these tasks listed belows has a box like the ones above`}
</Text>
  <Text>
  {`instead of disappearing, it would simply fade so you can always look back at what tasks you've done`}
</Text>
  <VStack sx={{"bg": "#ededed", "padding": "1em", "borderRadius": "0.5em", "shadow": "lg"}}>
  <Heading>
  {`Tasks`}
</Heading>
  <Input onBlur={(_e0) => addEvents([Event("state.list_state.set_new_item", {value:_e0.target.value})], (_e0))} placeholder={`Add a todo...`} sx={{"bg": "white"}} type={`text`}/>
  <Button onClick={(_e) => addEvents([Event("state.list_state.add_item", {})], (_e))} sx={{"bg": "white"}}>
  {`Add`}
</Button>
  <Divider/>
  <OrderedList>
  {state.list_state.items.map((ahrfkuec, i) => (
  <ListItem key={i}>
  <HStack>
  <Button onClick={(_e) => addEvents([Event("state.list_state.finish_item", {item:ahrfkuec})], (_e))} sx={{"height": "1.5em", "backgroundColor": "white", "border": "1px solid blue"}}/>
  <Text sx={{"fontSize": "1.25em"}}>
  {ahrfkuec}
</Text>
</HStack>
</ListItem>
))}
</OrderedList>
</VStack>
</VStack>
</Box>
</Box>
  <Spacer/>
  <Box sx={{"position": "fixed", "right": "1.5em", "top": "1.5em", "zIndex": "500"}}>
  <Menu>
  <MenuButton sx={{"width": "3em", "height": "3em", "backgroundColor": "white", "border": "1px solid #F4F3F6", "borderRadius": "0.375rem"}}>
  <HamburgerIcon sx={{"size": "4em", "color": "black"}}/>
</MenuButton>
  <MenuList>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/`} sx={{"width": "100%"}}>
  {`Home`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/dashboard`} sx={{"width": "100%"}}>
  {`Dashboard`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/multi_user_lookup`} sx={{"width": "100%"}}>
  {`Multi-User Lookup`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/single_user_entry_lookup`} sx={{"width": "100%"}}>
  {`Single User Entry and Lookup`}
</Link>
</MenuItem>
  <MenuDivider/>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`https://github.com/reflex-dev`} sx={{"width": "100%"}}>
  {`About`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`mailto:founders@=reflex.dev`} sx={{"width": "100%"}}>
  {`Contact`}
</Link>
</MenuItem>
</MenuList>
</Menu>
</Box>
</HStack>
  <NextHead>
  <title>
  {`Dashboard`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
  <meta content={`width=device-width, shrink-to-fit=no, initial-scale=1`} name={`viewport`}/>
</NextHead>
</Fragment>
  )
}
