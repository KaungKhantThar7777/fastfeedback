import { useAuth } from "@/lib/auth";
import { deleteFeedback } from "@/lib/db";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
} from "@chakra-ui/core";
import { mutate } from "swr";

function RemoveButon({ feedbackId }) {
  const [isOpen, setIsOpen] = React.useState();
  const { user } = useAuth();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  function onDelete() {
    console.log("delete");
    deleteFeedback(feedbackId);
    mutate(
      ["/api/feedback", user.token],
      (data) => {
        const remainedFeedback = data.feedback.filter((feedback) => feedback.id !== feedbackId);
        return { feedback: remainedFeedback };
      },
      false
    );
    onClose();
  }
  return (
    <>
      <IconButton
        aria-label="Delete Feedback"
        icon="delete"
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Feedback
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default RemoveButon;
