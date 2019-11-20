import types from './types.js'

export function setView(view) {
    return {
        type: type.SET_VIEW,
        payload: view
    }
}

