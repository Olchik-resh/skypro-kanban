 <template>
  <div class="task-card">
    <p>{{ taskTitle }}</p>
  </div>
</template>

<script>
export default {
  props: {
    taskTitle: {
      type: String,
      required: true
    }
  }
}
</script>