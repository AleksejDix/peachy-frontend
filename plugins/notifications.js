export default function(ctx, inject) {
  const $notification = {
    create(payload) {
      ctx.store.dispatch('notifications/create', payload)
    }
  }

  inject('notifications', $notification)
}
