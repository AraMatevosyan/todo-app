import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColumnDef } from "@tanstack/react-table";
import { RootState, AppDispatch } from "../../redux";
import { fetchTasks, deleteTasks, addTask } from "../../redux/home";
import { Table, Modal, Button, Tooltip } from "../../components";
import { Styled } from "./Home.styled";

type DataType = {
  id: number;
  title: string;
  completed: boolean;
};

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTasksIds, setSelectedTasksIds] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const shouldShowDeleteButton = !!selectedTasksIds.length;

  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.home,
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const columns: ColumnDef<DataType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      size: 80,
      cell: (info) => {
        const text = info.getValue() as string;
        return (
          <Tooltip text={text}>
            <Styled.Text>{text}</Styled.Text>
          </Tooltip>
        );
      },
    },
    {
      accessorKey: "completed",
      header: "Completed",
      size: 10,
      cell: (info) => (info.getValue() ? "Yes" : "No"),
    },
  ];

  const handleAddTask = () => {
    const newTask = {
      userId: 1,
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
    };
    dispatch(addTask(newTask));
    setNewTaskTitle("");
    closeAddModal();
  };

  const handleDeleteTasks = () => {
    dispatch(deleteTasks(selectedTasksIds));
    closeDeleteModal();
  };

  return (
    <Styled.HomeWrapper>
      <h2>Home Page</h2>
      <Styled.ActionsPanel>
        {shouldShowDeleteButton && (
          <Button onClick={openDeleteModal} styleType="secondary">
            delete
          </Button>
        )}
        <Button onClick={openAddModal} styleType="primary">
          add
        </Button>
      </Styled.ActionsPanel>
      <Table
        withCheckbox
        columns={columns}
        data={tasks}
        setSelectedRowKeys={setSelectedTasksIds}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        title="Confirm Deletion"
        primaryButton={
          <Button styleType="primary" onClick={handleDeleteTasks}>
            Yes
          </Button>
        }
        secondaryButton={
          <Button styleType="secondary" onClick={closeDeleteModal}>
            No
          </Button>
        }
      >
        <p>Are you sure you want to delete the selected tasks?</p>
      </Modal>

      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        title="Add New Task"
        primaryButton={
          <Button styleType="primary" onClick={handleAddTask}>
            Add
          </Button>
        }
        secondaryButton={
          <Button styleType="secondary" onClick={closeAddModal}>
            Cancel
          </Button>
        }
      >
        <Styled.TextArea
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
      </Modal>
    </Styled.HomeWrapper>
  );
};

export default Home;
