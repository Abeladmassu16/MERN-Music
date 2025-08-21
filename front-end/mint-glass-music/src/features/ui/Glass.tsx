import styled from "@emotion/styled";
import {
  compose,
  space,
  layout,
  color,
  border,
  typography,
  flexbox,
} from "styled-system";

const system = compose(space, layout, color, border, typography, flexbox);

export const GlassCard = styled("div")(
  {
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.35)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
  },
  system
);

export const Button = styled("button")(
  {
    cursor: "pointer",
    border: "none",
    padding: "10px 16px",
    borderRadius: "14px",
    fontWeight: 600,
    transition: "transform 0.05s ease-out, box-shadow 0.2s ease",
  },
  (props: any) => ({
    background: props?.theme?.colors?.mintStrong ?? "#A7F3D0",
    color: props?.theme?.colors?.textDark ?? "#052e2b",
    boxShadow: props?.theme?.shadows?.sm,
    ":hover": {
      filter: "brightness(1.05)",
      boxShadow: props?.theme?.shadows?.md,
    },
    ":active": { transform: "translateY(1px)" },
  }),
  system
);

export const Input = styled("input")(
  {
    border: "1px solid rgba(0,0,0,0.08)",
    padding: "10px 12px",
    borderRadius: "12px",
    outline: "none",
  },
  (props: any) => ({
    background: "rgba(255,255,255,0.8)",
    boxShadow: props?.theme?.shadows?.inset,
  }),
  system
);

export const Select = Input.withComponent("select");
