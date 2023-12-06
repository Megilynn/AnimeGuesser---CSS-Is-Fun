<template>
  <div>
    <section>
      <o-field label='Find a JS framework'>
        <o-autocomplete v-model='show' rounded expanded clearable placeholder='e.g. Naruto' icon='search'
          :data='filteredDataArray' @select='(option) => (selected = option)'>
          <template #empty>No results found</template>
        </o-autocomplete>
      </o-field>
      <p><b>Selected:</b> {{ selected }}</p>
    </section>
  </div>
</template>

<script lang='ts'>

</script>
<style></style>
