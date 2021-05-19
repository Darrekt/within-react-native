import Todo from "../../models/Todo";
import { TodoAction } from "../actionTypes";

const todoReducer = (state: Todo[], action: TodoAction) => {
  // Find the project containing this Todo, or uncategorised
  const [project, projIndex, todoIndex] = findTodoProj(state, action.payload);
  const [deadline, deadlineIndex] = findTodoDeadline(project, action.payload);

  let updatedTodo: Todo;
  let updatedDeadline: Deadline;

  function writeToProject(proj: Project, todo: Todo, ddl?: Deadline) {
    return new Project({
      ...proj,
      deadlines: ddl ? proj.deadlines.set(deadlineIndex, ddl) : proj.deadlines,
      todos: proj?.todos.set(todoIndex, todo),
    });
  }

  switch (action.type) {
    case Actions.TodoAdd:
      updatedDeadline = action.payload.deadline
        ? new Deadline({
            ...deadline,
            todos: deadline.todos.push(action.payload.id),
          })
        : deadline;
      return state.set(
        projIndex,
        new Project({
          ...project,
          deadlines: action.payload.deadline
            ? project.deadlines.set(deadlineIndex, updatedDeadline)
            : project.deadlines,
          todos: project.todos.push(action.payload),
        })
      );
    case Actions.TodoDelete:
      updatedDeadline = action.payload.deadline
        ? new Deadline({
            ...deadline,
            todos: deadline.todos.remove(deadlineIndex),
          })
        : deadline;
      return state.set(
        projIndex,
        new Project({
          ...project,
          deadlines: action.payload.deadline
            ? project.deadlines.set(deadlineIndex, updatedDeadline)
            : project.deadlines,
          todos: project.todos.delete(todoIndex),
        })
      );
    case Actions.TodoUpdate:
      updatedDeadline = action.payload.deadline
        ? new Deadline({
            ...deadline,
            todos: deadline.todos.contains(action.payload.id)
              ? deadline.todos
              : deadline.todos.push(action.payload.id),
          })
        : new Deadline({
            ...deadline,
            todos: deadline.todos.filterNot(
              (todoID) => todoID == action.payload.id
            ),
          });
      return state.set(
        projIndex,
        writeToProject(project, action.payload, updatedDeadline)
      );

    // TodoProductivityActions
    case Actions.TodoToggleComplete:
      return state.set(
        projIndex,
        writeToProject(
          project,
          new Todo({ ...action.payload, completed: !action.payload.completed })
        )
      );

    // TodoTimerActions
    case Actions.TodoStart:
      const finishAt = new Date();
      if (action.payload.remaining) {
        finishAt.setSeconds(finishAt.getSeconds() + action.payload.remaining);
      } else {
        finishAt.setMinutes(
          finishAt.getMinutes() + settings.defaultInterval / 60
        );
      }
      finishAt.setMilliseconds(finishAt.getMilliseconds() + 500);
      return state.set(
        projIndex,
        writeToProject(
          project,
          new Todo({
            ...action.payload,
            remaining: undefined,
            finishingTime: finishAt,
          })
        )
      );

    case Actions.TodoPause:
    case Actions.TodoReset:
    case Actions.TodoFinish:
      return state.set(
        projIndex,
        writeToProject(
          project,
          new Todo({
            ...action.payload,
            remaining:
              action.type == Actions.TodoPause
                ? getTimeLeft(action.payload)
                : undefined,
            laps:
              action.payload.laps +
              (action.type === Actions.TodoFinish ? 1 : 0),
            finishingTime: undefined,
          })
        )
      );

    default:
      throw Error("Invalid todo action");
  }
};

// const todoReducer = (
//   state: List<Project>,
//   action: TodoAction
// ) => {
//   // Find the project containing this Todo, or uncategorised
//   const [project, projIndex, todoIndex] = findTodoProj(state, action.payload);
//   const [deadline, deadlineIndex] = findTodoDeadline(project, action.payload);

//   let updatedTodo: Todo;
//   let updatedDeadline: Deadline;

//   function writeToProject(proj: Project, todo: Todo, ddl?: Deadline) {
//     return new Project({
//       ...proj,
//       deadlines: ddl ? proj.deadlines.set(deadlineIndex, ddl) : proj.deadlines,
//       todos: proj?.todos.set(todoIndex, todo),
//     });
//   }

//   switch (action.type) {
//     case Actions.TodoAdd:
//       updatedDeadline = action.payload.deadline
//         ? new Deadline({
//             ...deadline,
//             todos: deadline.todos.push(action.payload.id),
//           })
//         : deadline;
//       return state.set(
//         projIndex,
//         new Project({
//           ...project,
//           deadlines: action.payload.deadline
//             ? project.deadlines.set(deadlineIndex, updatedDeadline)
//             : project.deadlines,
//           todos: project.todos.push(action.payload),
//         })
//       );
//     case Actions.TodoDelete:
//       updatedDeadline = action.payload.deadline
//         ? new Deadline({
//             ...deadline,
//             todos: deadline.todos.remove(deadlineIndex),
//           })
//         : deadline;
//       return state.set(
//         projIndex,
//         new Project({
//           ...project,
//           deadlines: action.payload.deadline
//             ? project.deadlines.set(deadlineIndex, updatedDeadline)
//             : project.deadlines,
//           todos: project.todos.delete(todoIndex),
//         })
//       );
//     case Actions.TodoUpdate:
//       updatedDeadline = action.payload.deadline
//         ? new Deadline({
//             ...deadline,
//             todos: deadline.todos.contains(action.payload.id)
//               ? deadline.todos
//               : deadline.todos.push(action.payload.id),
//           })
//         : new Deadline({
//             ...deadline,
//             todos: deadline.todos.filterNot(
//               (todoID) => todoID == action.payload.id
//             ),
//           });
//       return state.set(
//         projIndex,
//         writeToProject(project, action.payload, updatedDeadline)
//       );

//     // TodoProductivityActions
//     case Actions.TodoToggleComplete:
//       return state.set(
//         projIndex,
//         writeToProject(
//           project,
//           new Todo({ ...action.payload, completed: !action.payload.completed })
//         )
//       );

//     // TodoTimerActions
//     case Actions.TodoStart:
//       const finishAt = new Date();
//       if (action.payload.remaining) {
//         finishAt.setSeconds(finishAt.getSeconds() + action.payload.remaining);
//       } else {
//         finishAt.setMinutes(
//           finishAt.getMinutes() + settings.defaultInterval / 60
//         );
//       }
//       finishAt.setMilliseconds(finishAt.getMilliseconds() + 500);
//       return state.set(
//         projIndex,
//         writeToProject(
//           project,
//           new Todo({
//             ...action.payload,
//             remaining: undefined,
//             finishingTime: finishAt,
//           })
//         )
//       );

//     case Actions.TodoPause:
//     case Actions.TodoReset:
//     case Actions.TodoFinish:
//       return state.set(
//         projIndex,
//         writeToProject(
//           project,
//           new Todo({
//             ...action.payload,
//             remaining:
//               action.type == Actions.TodoPause
//                 ? getTimeLeft(action.payload)
//                 : undefined,
//             laps:
//               action.payload.laps +
//               (action.type === Actions.TodoFinish ? 1 : 0),
//             finishingTime: undefined,
//           })
//         )
//       );

//     default:
//       throw Error("Invalid todo action");
//   }
// };

export default todoReducer;
