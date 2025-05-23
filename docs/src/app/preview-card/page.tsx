import * as React from "react";
import type { Metadata } from "next";

import { Section, Container, Flex, Text, PreviewCard, Link, Grid, Strong, Box } from "test-package";

import "./customization-tests.css";

export const metadata: Metadata = {
  title: "PreviewCard",
};

function Size1() {
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger href="#" render={<Link />}>
        Size 1
      </PreviewCard.Trigger>
      <PreviewCard.Popup size="1">
        <Text size="1" render={<p />}>
          High quality, perfectionism, minimalism and space optimization are some of the
          characteristics that inspired the creation of The Coffee.
        </Text>
      </PreviewCard.Popup>
    </PreviewCard.Root>
  );
}

function Size2() {
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger href="#" render={<Link />}>
        Size 2
      </PreviewCard.Trigger>
      <PreviewCard.Popup size="2">
        <Text size="2" render={<p />}>
          High quality, perfectionism, minimalism and space optimization are some of the
          characteristics that inspired the creation of The Coffee.
        </Text>
      </PreviewCard.Popup>
    </PreviewCard.Root>
  );
}

function Size3() {
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger href="#" render={<Link />}>
        Size 3
      </PreviewCard.Trigger>
      <PreviewCard.Popup size="3">
        <Text size="3" render={<p />}>
          High quality, perfectionism, minimalism and space optimization are some of the
          characteristics that inspired the creation of The Coffee.
        </Text>
      </PreviewCard.Popup>
    </PreviewCard.Root>
  );
}

function FixedWidth() {
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger href="#" render={<Link />}>
        Fixed width
      </PreviewCard.Trigger>
      <PreviewCard.Popup size="2" width="200px">
        <Text size="2" render={<p />}>
          Width is set to 200px.
        </Text>
      </PreviewCard.Popup>
    </PreviewCard.Root>
  );
}

function ResponsiveWidth() {
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger href="#" render={<Link />}>
        Responsive width
      </PreviewCard.Trigger>
      <PreviewCard.Popup size="2" width={{ initial: "200px", lg: "400px" }}>
        <Text size="2" render={<p />}>
          Width is 200px initially and 400px on large screens and up.
        </Text>
      </PreviewCard.Popup>
    </PreviewCard.Root>
  );
}

function FixedHeight() {
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger href="#" render={<Link />}>
        Fixed height
      </PreviewCard.Trigger>
      <PreviewCard.Popup size="2" height="100px">
        <Text size="2" render={<p />}>
          Height is set to 100px.
        </Text>
      </PreviewCard.Popup>
    </PreviewCard.Root>
  );
}

function ResponsiveHeight() {
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger href="#" render={<Link />}>
        Responsive height
      </PreviewCard.Trigger>
      <PreviewCard.Popup size="2" height={{ initial: "100px", lg: "200px" }}>
        <Text size="2" render={<p />}>
          Height is 100px initially and 200px on large screens and up.
        </Text>
      </PreviewCard.Popup>
    </PreviewCard.Root>
  );
}

function MoreElementsContent() {
  return (
    <Text>
      Learn more about{" "}
      <PreviewCard.Root>
        <PreviewCard.Trigger href="#" render={<Link size="3" />}>
          The Coffee
        </PreviewCard.Trigger>
        <PreviewCard.Popup size="3" width="300px">
          <Grid columns="2" rows="1" className="customization-tc-grid">
            <Box className="customization-tc-logo">TC</Box>
            {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
            <Text size="2" render={<h4 />}>
              <Strong>The Coffee</Strong>{" "}
            </Text>
            <Text size="2" render={<p />} style={{ gridColumnStart: 2 }}>
              High quality, perfectionism, minimalism and space optimization are some of the
              characteristics that inspired the creation of The Coffee.
            </Text>
          </Grid>
        </PreviewCard.Popup>
      </PreviewCard.Root>{" "}
      coffe shop.
    </Text>
  );
}

export default function PreviewCardPage() {
  return (
    <Section>
      <Container size="3">
        <Flex gap="7">
          <Flex gap="3">
            {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
            <Text render={<h1 />} size="7" weight="3">
              Preview Card
            </Text>
            <Text render={<p />} size="5" color="mauve" contrast="low">
              A component that displays a preview of content when hovering over a link.
            </Text>
          </Flex>
          <Flex gap="2">
            {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
            <Text render={<h2 />} size="5" weight="3">
              Size
            </Text>
            <Text render={<p />}>
              Size prop controls padding, border radius, and max-width. The content size is up to
              the user.
            </Text>
          </Flex>
          <Flex direction="row" align="center" gap="4">
            <Size1 />
            <Size2 />
            <Size3 />
          </Flex>
          <Flex gap="2">
            {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
            <Text render={<h2 />} size="5" weight="3">
              Width
            </Text>
            <Text render={<p />}>
              Default maxWidth for size 2 is 320px. width, maxWidth, and minWidth props available as
              fixed and responsive values.
            </Text>
          </Flex>
          <Flex direction="row" align="center" gap="4">
            <FixedWidth />
            <ResponsiveWidth />
          </Flex>
          <Flex gap="2">
            {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
            <Text render={<h2 />} size="5" weight="3">
              Height
            </Text>
            <Text render={<p />}>
              By default height is not set. height, maxHeight, and minHeight props available as
              fixed and responsive values.
            </Text>
          </Flex>
          <Flex direction="row" align="center" gap="4">
            <FixedHeight />
            <ResponsiveHeight />
          </Flex>
          <Flex gap="2">
            {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
            <Text render={<h2 />} size="5" weight="3">
              Complex Content
            </Text>
            <Text render={<p />}>
              Preview cards can contain complex content with multiple elements and custom styling.
            </Text>
          </Flex>
          <Flex direction="column" gap="4">
            <MoreElementsContent />
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
}
