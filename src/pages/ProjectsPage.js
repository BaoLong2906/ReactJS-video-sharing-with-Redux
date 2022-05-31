import KanbanBoard from "../components/kanbanboard/KanbanBoard";
import NavHeader from "../components/NavHeader";

function ProjectsPage(props) {
  return (
    <>
      <NavHeader/>
      <KanbanBoard/>
    </>
  );
}

export default ProjectsPage;