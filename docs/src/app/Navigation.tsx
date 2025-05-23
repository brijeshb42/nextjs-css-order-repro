import * as React from "react";
import { Box, Flex, Text, ScrollArea } from "test-package";
import { SidebarLink } from "./SidebarLink";

function SidebarList({ children }: { children: React.ReactNode }) {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {children}
    </ul>
  );
}

export function Navigation() {
  return (
    <Box position="fixed" style={{ top: 0, width: 250, height: "100%" }}>
      <ScrollArea>
        <nav style={{ padding: 24 }}>
          <Flex direction="column" gap="4">
            <Flex gap="2">
              {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
              <Text render={<h3 />} size="2" id="popups-heading">
                Popups
              </Text>
              <SidebarList>
                <li>
                  <SidebarLink href="/preview-card">Preview Card</SidebarLink>
                </li>
              </SidebarList>
            </Flex>
          </Flex>
        </nav>
      </ScrollArea>
    </Box>
  );
}
