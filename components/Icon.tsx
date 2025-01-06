import { IconProps } from "@expo/vector-icons/build/createIconSet";
import Ionicons from "@expo/vector-icons/Ionicons";

type IoniconName = "videocam" | "search" | "tv" | "add" | "remove";

interface Props {
  name: IoniconName;
  size: number;
  color: string;
}

export default function Icon({ name, size, color }: Props) {
  return <Ionicons name={name} size={size} color={color} />;
}
