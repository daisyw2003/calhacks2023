import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import "gridjs/dist/theme/mermaid.css"
import { Box, Button, Center, Divider, HStack, Image, Input, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextLink from "next/link"
import { Grid as DataTableGrid } from "gridjs-react"
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

  const ref_name = useRef(null); refs['ref_name'] = ref_name;
  const ref_email = useRef(null); refs['ref_email'] = ref_email;

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
  <Text sx={{"backgroundImage": "linear-gradient(271.68deg, #EE756A 0.75%, #8ad2ff 88.52%)", "backgroundClip": "text", "fontWeight": "bold", "fontSize": "2em"}}>
  {`Look Up Your Friends' and Your Tasks`}
</Text>
  <Text>
  {`Please separate names and emails with commas`}
</Text>
  <Box as={`form`} onSubmit={(_e0) => addEvents([Event("state.query_form.handle_submit", {form_data:{"name": getRefValue(ref_name), "email": getRefValue(ref_email)}})], (_e0))}>
  <VStack>
  <Input id={`name`} placeholder={`Name`} ref={ref_name} type={`text`}/>
  <Input id={`email`} placeholder={`Email`} ref={ref_email} type={`text`}/>
  <Button type={`submit`}>
  {`Submit`}
</Button>
</VStack>
</Box>
  <Divider/>
  <DataTableGrid columns={state.query_form.output.columns} data={state.query_form.output.data} pagination={true} search={true} sort={true}/>
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
  {`Multi-User Lookup`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
  <meta content={`width=device-width, shrink-to-fit=no, initial-scale=1`} name={`viewport`}/>
</NextHead>
</Fragment>
  )
}
