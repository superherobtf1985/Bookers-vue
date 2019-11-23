<template>
  <div class="row">
    <h1>Book show</h1>
    {{ id }}
    <Form></Form>
  </div>
</template>

<script>
import Form from '@/components/Form'
export default {
  name: 'Books',
  components: {
    Form
  },
  props: ["id"],
}
</script>
