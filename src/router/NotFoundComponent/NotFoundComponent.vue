<template>
  <div class="not-found">
    Can't found the path: <b>{{ $route.fullPath }}</b>
    <div>
      Please check the url or Redirect to home page:
      <router-link to="/" replace>Home</router-link>
    </div>
  </div>
</template>
