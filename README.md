# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Lab 11 Reflection: 
In addition to adding a useContext for the theme, I also added it for the import of data for each of the individual profiles I created in one of the early labs. I also added useContext for addProfile, since it was used a lot in each of the pages. addProfile handles the addition of a profile through filling out the form, and catData holds the data I have for my own set of profiles. Theme, toggleTheme, catData, and addProfile were four of the states that I used most often in each of the pages. This means I don't have to import the theme or addProfile across multiple components, I simply need to just import it where needed. Any other state was either only used in one page or at maximum two, so it wasn't worth moving to Context.


Github Repository: https://github.com/CGT390/CGT390_Profile_App

Link to Web: https://cgt390.github.io/CGT390_Profile_App/