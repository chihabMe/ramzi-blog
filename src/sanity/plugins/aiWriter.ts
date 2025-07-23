import { definePlugin } from "sanity";
import { RobotIcon } from "@sanity/icons";
import AiWriterTool from "../components/AiWriterTool";

export const aiWriterPlugin = definePlugin({
  name: "ai-writer",
  tools: [
    {
      name: "ai-writer",
      title: "Générateur IA",
      icon: RobotIcon,
      component: AiWriterTool,
    },
  ],
});
