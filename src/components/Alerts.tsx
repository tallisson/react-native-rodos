import { Alert } from "react-native";

interface ConfirmDeleteProps {
  removeTask: () => void
}

export function showConfirmDelete({ removeTask }: ConfirmDeleteProps) {
  return Alert.alert(
    'Remover Item',
    'Tem certeza que você deseja remover esse item?',
    [
      {
        text: 'Não',
      },
      {
        text: 'Sim',
        onPress: () => removeTask(),
      },
    ]
  );
}

export function showAlertTaskExist() {
  return Alert.alert(
    'Task já cadastrada',
    'Você não pode cadastrar uma task com o mesmo nome!',
    [
      {
        text: 'Ok',
      }
    ]
  );
}