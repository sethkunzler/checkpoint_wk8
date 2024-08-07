import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  // @ts-ignore
  account: {},
  /** @type {import('./models/Notebook.js').Notebook[]} */
  notebooks: [],
  /** @type {import('./models/Notebook.js').Notebook | null} */
  activeNotebook: null,
  /** @type {import('./models/Entry.js').Entry[]} */
  entries: [],
  editingNotebook: false, 

})
