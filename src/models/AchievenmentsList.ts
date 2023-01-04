
import { ProjectEntity } from "../models/Project";
import { List } from "immutable";
import { compareCompleted } from "../util/compareDates";
import { useAppSelector } from "../redux/hooks";
import {
  getCompletedProjects,
  getCompletedTodos,
  getAllTodos,
} from "../redux/selectors";
import { TodoEntity } from "../models/Todo";
const AchievementsData = [
    {
      title: "Complete the survey!",
      count: 10,
    },
    {
      title: "Complete 1 to do",
      count: 10,
    },
    {
      title: "Complete 3 to do",
      count: 10,
    },
    {
      title: "Complete 5 to do",
      count: 25,
    },
    {
      title: "Complete 10 to do",
      count: 50,
    },
    {
      title: "Complete 1 project",
      count: 10,
    },
    {
      title: "Complete 3 projects",
      count: 25,
    },
    {
      title: "Complete 5 projects",
      count: 50,
    },
    {
      title: "Complete 10 projects",
      count: 100,
    },
  ];

export function getTaskStatus() {
    const projects = useAppSelector(getCompletedProjects); //projects
    const todoItems: TodoEntity[] = useAppSelector(getAllTodos); //所有的todo
    const completedTodoItems: TodoEntity[] = useAppSelector(getCompletedTodos); //完成todo
  
    const groupItems = List(completedTodoItems as TodoEntity[])
      .sort(compareCompleted)
      .groupBy((iitem) =>
        iitem.completed ? new Date(iitem.completed).toDateString() : null
      )
      .toArray();
  
    let projectsCompletedCount = projects.length; //完成projects的个数
    console.log(projectsCompletedCount)
    let todoCompletedCoumt = 0;
    groupItems.map((datedGroup: any) =>
      datedGroup[1].map(
        (item: ProjectEntity | TodoEntity) => (todoCompletedCoumt += 1)
      )
    );
    var dateCompleteItems: any[] = [false];
    if (todoCompletedCoumt == 0) {
        dateCompleteItems.push(false, false, false, false);
    }
   else  if (todoCompletedCoumt < 3) {
      // 显示 complete 1  10.png
      dateCompleteItems.push(true, false, false, false);
    } else if (todoCompletedCoumt < 5) {
      // 显示 complete 1   complete 3 10.png
      dateCompleteItems.push(true, true, false, false);
    } else if (todoCompletedCoumt < 10) {
      // 显示 complete 1   complete 3 complete 5  10.png    25.png
  
      dateCompleteItems.push(true, true, true, false);
    } else {
      // 显示 complete 1   complete 3 complete 5 complete 10  50.png
      dateCompleteItems.push(true, true, true, true);
    }
  
    var projectTodoTotalArr: any[] = [];
if (projectsCompletedCount == 0) {
    projectTodoTotalArr.push(false, false, false, false);
} else  if (projectsCompletedCount < 3 ) {
      // 显示 complete 1  10.png
      projectTodoTotalArr.push(true, false, false, false);
    } else if (projectsCompletedCount < 5) {
      // 显示 complete 1   complete 3 10.png
      projectTodoTotalArr.push(true, true, false, false);
    } else if (projectsCompletedCount < 10) {
      // 显示 complete 1   complete 3 complete 5  10.png    25.png
  
      projectTodoTotalArr.push(true, true, true, false);
    } else {
      // 显示 complete 1   complete 3 complete 5 complete 10  50.png
      projectTodoTotalArr.push(true, true, true, true);
    }
    //数组合并
    dateCompleteItems = dateCompleteItems.concat(projectTodoTotalArr);
  
    var contentItems: any[] = [];
    for (let index = 0; index < AchievementsData.length; index++) {
      const count = AchievementsData[index]["count"];
      const title = AchievementsData[index]["title"];
      const status = dateCompleteItems[index];
  
      contentItems.push({ title: title, compelete: status, count: count });
    }



    return  contentItems
  }
 