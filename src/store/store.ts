import { createStore } from "vuex"
import { ApiRoutes } from "../helpers/staticValues"

const store = createStore({
  state() {
    return {
      users: null,
      totalUsers: null,
      favorites: new Map(),
      controller: new AbortController()
    }
  },
  mutations: {
    setUsers(state, value) {
      state.users = value
    },
    setTotalUsers(state, value) {
      state.totalUsers = value
    },
    setFavorite(state, value: UserProperties) {
      if (state.favorites.has(value.name)) {
        state.favorites.delete(value.name)
        return
      }

      const newFavorite: UserProperties = {
        name: value.name,
        height: value.height,
        mass: value.mass,
        hairColor: value.hairColor ?? value.hair_color,
        favorite: true
      }

      state.favorites.set(value.name, newFavorite)
    },
  },
  actions: {
    async fetchUsers(ctx, pageNumber = 1) {
      try {
        if (ctx.state.controller) ctx.state.controller.abort()
        ctx.state.controller = new AbortController()

        const res = await fetch(ApiRoutes.page + pageNumber, { signal: ctx.state.controller.signal })
        const data = await res.json()

        if (!data.results) {
          throw new Error('Empty results')
        }

        const formattedUsers = data.results.map((user: UserProperties) => {
          return {
            name: user.name,
            height: user.height,
            mass: user.mass,
            hairColor: user.hair_color,
            favorite: ctx.state.favorites.has(user.name)
          }
        })

        ctx.commit('setTotalUsers', data.count)
        ctx.commit('setUsers', formattedUsers)
      } catch (err) {
        console.error(err)
        return null
      }
    },
    abortFetchUsers(ctx) {
      if (ctx.state.controller) ctx.state.controller.abort()
    }
  }
})

export default store
