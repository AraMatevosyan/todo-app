import React, { PropsWithChildren } from "react";
import { Styled } from "./Modal.styled";
import ReactModal from "react-modal";

type ModalProps = {
  isOpen: boolean;
  title: string;
  primaryButton: React.ReactNode;
  secondaryButton: React.ReactNode;
  onRequestClose: () => void;
} & PropsWithChildren;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "384px",
    maxWidth: "384px",
  },
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  secondaryButton,
  primaryButton,
  onRequestClose,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <Styled.Title>{title}</Styled.Title>
      <Styled.Content>{children}</Styled.Content>
      <Styled.ButtonsGroup>
        {secondaryButton}
        {primaryButton}
      </Styled.ButtonsGroup>
    </ReactModal>
  );
};
