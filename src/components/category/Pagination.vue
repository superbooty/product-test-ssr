<template>
    <div v-if="pagination" class="pagination-container">
        <div class="pagination">
            <ul class="pagination-list">
                <li v-for="(pageNum, index) in pagination.totalPages" 
                    class="pagination-item" :class="{'active': activePageNum === index + 1}"
                    :key="index" @click="paginate(index + 1)">
                    {{index + 1}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {ref} from 'vue';

export default {
  name: "Pagination",
  props: {
    pagination: Object
  },
  
  emits: ["page-change"],
  setup(props, {emit}) {
   
    const activePageNum = ref(1);
    const paginate = (pageNum) => {
        activePageNum.value = pageNum;
        emit("page-change", {
          pageNum
        });
    } 
    return {
      paginate,
      activePageNum,
    }
  },
  components: {
  }
  
};
</script>
<style scoped lang="scss">
.pagination-container {
    grid-column: 2;
    color: #000;
    font-size: 12px;
    line-height: 16px;
    font-family: Helvetica-Now-Text-Regular,Helvetica,Arial,sans-serif;
    margin-top: 32px;
    border-top: 2px solid #e9e9e9;
    padding: 22px 0;
    position: relative;
    text-align: center;
    .pagination {
      ul {
        display: flex;
        list-style: none;
        justify-content: center;
        padding: 0;
        margin: 0;
        li {
          width: 40px;
          height: 40px;
          line-height: 40px;
          margin: 0 8px;
          &.active {
            border: 1px solid black;
          }
        }
      }
    }
  }
</style>