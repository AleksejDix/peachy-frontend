import { uuid } from 'uuidv4'

export const state = () => ({
  list: []
})

export const getters = {
  list(state) {
    return state.list
  }
}

export const mutations = {
  create(state, payload) {
    state.list.push({
      ...payload,
      id: uuid()
    })
  },
  destroy(state, id) {
    state.list = state.list.filter((x) => x.id !== id)
  }
}

export const actions = {
  create({ commit }, payload) {
    commit('create', payload)
  },
  destroy({ commit }, payload) {
    commit('destroy', payload)
  }
}
