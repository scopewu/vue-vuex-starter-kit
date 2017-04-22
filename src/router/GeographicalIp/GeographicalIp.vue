<template>
  <div>
    <div class="geographical-ip-title">Search geographical position:</div>
    <div class="geographical-ip">
      <div class="geographical-search">
        <form class="" @submit.prevent="searchGeographicalData">
          <div class="search-in">
            <input type="text" v-model="hostname" class="form-control" placeholder="hostname or ip">
          </div>
          <button type="submit" class="btn btn-default">Search</button>
        </form>
      </div>
      <div class="geographical-list">
        <div>Geographical position of {{ hostname || 'localhost' }}</div>
        <table class="geographical-list-table">
          <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(v, k) in geographicalData" :key="k">
            <td>{{ k }}</td>
            <td>{{ v }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        hostname: '',
        geographicalData: {}
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fetchGeographicalData(vm.hostname)
      })
    },
    methods: {
      fetchGeographicalData(hostName = '') {
        axios.get(`https://freegeoip.net/json/${hostName}`)
          .then((res) => {
            this.geographicalData = res.data
          })
      },
      searchGeographicalData() {
        this.fetchGeographicalData(this.hostname)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .geographical-ip-title, .geographical-search {
    margin-bottom: 10px;
  }

  .geographical-ip {

  }

  .search-in {
    display: inline-block;
    margin-right: 8px;
    vertical-align: top;
  }

  .geographical-list-table {
    th {
      text-align: left;
    }
    th, td {
      padding: 4px;
      border: 1px solid #ccc;
    }
  }
</style>
