<template>
  <v-card outlined>
    <v-card color="surface" class="px-1" flat>
      <v-row no-gutters align="center">
        <!-- active filters -->
        <v-flex shrink>
          <v-menu
            v-for="(item, index) in selectedFilters"
            v-model="item.menu"
            :key="index"
            :close-on-content-click="false"
            @input="
              $event || item.value ? null : cancelFilter(index, item.type)
            "
          >
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                v-bind="attrs"
                v-on="on"
                class="mr-1"
                outlined
                filter
                close
                @click:close="cancelFilter(index, item.type)"
              >
                {{ item.title }}
                <span v-if="item.value">: {{ item.value }}</span>
              </v-chip>
            </template>

            <!-- popup type 0 -->
            <Textfield
              v-if="item.type == 0"
              :info="item"
              :filter_name="item.identifier"
              @success="setFilterValue($event, index)"
              @close-menu="closeMenu(index)"
            />

            <!-- popup type 1 -->
            <Number
              v-if="item.type == 1"
              :info="item"
              @success="setFilterValue($event, index)"
              @close-menu="closeMenu(index)"
            />

            <!-- popup type 2 -->
            <Date
              v-if="item.type == 2"
              :info="item"
              @success="setFilterValue($event, index)"
              @close-menu="closeMenu(index)"
            />

            <!-- popup type 3 -->
            <Period
              v-if="item.type == 3"
              :info="item"
              @success="setFilterValue($event, index)"
              @close-menu="closeMenu(index)"
            />

            <!-- popup type 4 -->
            <Radio
              v-if="item.type == 4"
              :info="item"
              @success="setFilterValue($event, index, item.type)"
              @close-menu="closeMenu(index)"
            />

            <!-- popup type 5 -->
            <BooleanCheck
              v-if="item.type == 5"
              :info="item"
              @success="setFilterValue($event, index, item.type)"
              @close-menu="closeMenu(index)"
            />

            <!-- popup type 6 -->
            <CurrencyValue
              v-if="item.type == 6"
              :info="item"
              @success="setFilterValue($event, index)"
              @close-menu="closeMenu(index)"
            />
          </v-menu>
        </v-flex>

        <!-- input to select filter -->
        <v-menu v-model="menuFilter" offset-y max-width="300">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="searchFor"
              v-bind="attrs"
              v-on="on"
              name="filter"
              placeholder="Search for"
              background-color="transparent"
              append-icon="mdi-magnify"
              autocomplete="off"
              hide-details
              solo
              flat
              @keypress="setMenuFilter()"
            />
          </template>

          <!-- menu of avaliable filters -->
          <v-list class="accent lighten-1 py-0">
            <template v-for="(item, index) in dataFilters">
              <v-list-item
                v-if="checkFilter(item)"
                :key="index"
                @click="addFilter(item)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-if="item.hint && searchFor">
                    {{ item.hint }}: {{ searchFor }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>

        <!-- clear all filters -->
        <v-tooltip bottom v-if="selectedFilters.length > 0">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              size="22"
              class="mx-2"
              @click="clearFilters()"
              >mdi-backspace-outline
            </v-icon>
          </template>

          <span>Clear All</span>
        </v-tooltip>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import Textfield from "./types/Textfield"; // index = 0
import Number from "./types/Number"; // index = 1
import Date from "./types/Date"; // index = 2
import Period from "./types/Period"; // index = 3
import Radio from "./types/Radio"; // index = 4
import BooleanCheck from "./types/BooleanCheck"; // index = 5
import CurrencyValue from "./types/CurrencyValue"; // index = 6

// pending create a checkbox that returns an array of values

export default {
  components: {
    Textfield,
    Number,
    Date,
    Period,
    Radio,
    BooleanCheck,
    CurrencyValue,
  },

  props: {
    dataFilters: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      allFilters: true,
      searchFor: "",
      selectedFilters: [],
      filters: {},
      menuFilter: false,
    };
  },

  watch: {
    searchFor() {
      this.searchFor == ""
        ? (this.allFilters = true)
        : (this.allFilters = false);
    },
  },

  beforeMount() {
    this.handleCurrent();
  },

  methods: {
    // check if it is not included in the table of selected filters
    checkFilter(data) {
      if (!this.selectedFilters.map((e) => e.title).includes(data.title)) {
        if (isNaN(this.searchFor)) {
          return this.allFilters || data.type === 0; // all || string
        }

        return this.allFilters || data.type === 1; // all || number
      } else {
        return false;
      }
    },

    addFilter(data) {
      let payload = {
        ...data,
        value: "",
        menu: true,
      };

      // text type
      if (payload.type == 0 || payload.type == 1) {
        if (this.searchFor) {
          payload.value = this.searchFor; // search value
          payload.menu = false; // menu show

          this.setFilter(data.identifier, this.searchFor); // add to filters object
          this.searchFor = ""; // restart input search

          this.submitFilters();
        }
      }

      this.selectedFilters.push(payload); // add to selected filters list
    },

    async setFilterValue(value, index, type) {
      // redio type
      if (type === 4) {
        let data = "";
        // getting label for exibition array
        this.selectedFilters[index].items.map((e) => {
          if (e.value === value) {
            data = e.label;
          }
        });

        // assigning value to exibition array
        this.selectedFilters[index].value = data;
      } else {
        // others types
        // assigning value to exibition array
        this.selectedFilters[index].value = value;
      }

      // checkbox type
      if (type === 5) {
        const data = value.split(","); // convert string to array

        // return array to object filter
        await data.map((e) => {
          this.setFilter(e, true); // add to filters object
        });
      } else {
        // add to filters object
        await this.setFilter(this.selectedFilters[index].identifier, value);
      }

      this.submitFilters();
    },

    setFilter(identifier, value) {
      // add var value to filters
      this.filters[identifier] = value;
    },

    setMenuFilter() {
      if (this.menuFilter) return;
      this.menuFilter = true;
    },

    closeMenu(index) {
      //  check if the search value is empty
      if (this.selectedFilters[index].value === "") {
        this.cancelFilter(index);
      } else {
        this.selectedFilters[index].menu = false; // close dialog
      }
    },

    // cancel specific filter
    cancelFilter(index, type) {
      if (type === 5) {
        // remove array of filters (checkbox type)
        this.selectedFilters[index].items.forEach((element) => {
          this.filters[element] = undefined;
        });
      } else {
        // remove specific filter
        this.filters[this.selectedFilters[index].identifier] = undefined;
      }

      this.selectedFilters.splice(index, 1);
      this.submitFilters();
    },

    // reset all filters
    clearFilters() {
      this.selectedFilters = [];
      this.filters = {};
      this.submitFilters();
    },

    // set filters on route query
    submitFilters() {
      const query = {
        ...this.$route.query,
        ...this.filters,
      };

      this.$router.replace({ query: query }).catch({
        /* ignore */
      });
    },

    // get query params and set on selectedFilters
    handleCurrent() {
      const query = this.$route.query;

      if (query && this.dataFilters.length > 0) {
        this.dataFilters.map((e) => {
          Object.keys(this.$route.query).forEach((key) => {
            if (e.identifier === key) {
              this.selectedFilters.push({
                ...e,
                menu: false,
                value: query[key],
              });
            }
          });
        });
      }
    },
  },
};
</script>