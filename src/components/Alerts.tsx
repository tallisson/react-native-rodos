import { Alert } from "react-native";

interface ConfirmDeleteProps {
  deleteTask: () => void
}

export function showConfirmDelete({ deleteTask }: ConfirmDeleteProps) {
  return Alert.alert(
    'Deletar Task',
    'Você tem certeza que deseja remover essa Task?',
    [
      {
        text: 'Sim',
        onPress: () => deleteTask(),
      },
      {
        text: 'Não',
      },
    ]
  );
}