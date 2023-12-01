  <template>
    <label :for="props.id">{{ props.label }}</label>
    <select :id="props.id" :value="props.modelValue" @change="changeOption">
      <option value="">Не выбрано</option>
      <option 
      v-for="param in props.params"
      :key="param.value"
      :value="param.value"
      >
       {{ param.text }}
      </option>
    </select>
  </template>

<script setup>
  import { defineEmits, defineProps } from 'vue'
  const props =  defineProps({
    modelValue: {
      type: String
    },
    params: {
      type: Array,
      required: true
    },
    label: {
    type: [Number, String]
    },
    id: {
      type: [Number, String]
    }
  })
  const emit = defineEmits(['update:modelValue', 'change'])
  const changeOption = (event) => {
    emit('update:modelValue', event.target.value);
    emit('change')
  }
</script>

