import React, { PropsWithChildren } from 'react'
import { Styled } from "./Modal.styled";
import ReactModal from 'react-modal';

type ModalProps = {
  isOpen: boolean;
  title: string;
  primaryButton: React.ReactNode;
  secondaryButton: React.ReactNode;
  onRequestClose: () => void;
} & PropsWithChildren;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const Modal: React.FC<ModalProps> = ({isOpen, title, children, secondaryButton, primaryButton, onRequestClose}) => {

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Delete Confirmation"
    >
      <Styled.Title>{title}</Styled.Title>
      {children}
      <Styled.ButtonsGroup>
        {secondaryButton}
        {primaryButton}
      </Styled.ButtonsGroup>
    </ReactModal>
  );
};
