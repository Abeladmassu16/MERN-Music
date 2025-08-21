import type { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { theme } from "../theme";

const Root = styled.div({
  minHeight: "100vh",
  background: `linear-gradient(135deg, ${theme.colors.background} 0%, #f6fffb 60%, #ffffff 100%)`,
  padding: "24px",
  display: "grid",
  gridTemplateRows: "auto 1fr",
});

const Header = styled.header({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
});

const Title = styled.h1({
  margin: 0,
  fontWeight: 800,
  letterSpacing: 0.2,
});

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Root>
      <Header>
        <Title>🎶 My Musics</Title>
      </Header>
      {children}
    </Root>
  );
}
