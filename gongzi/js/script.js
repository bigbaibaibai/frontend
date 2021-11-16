Vue.component('togglebutton', {
    props: ['label', 'name'],
    template: `<div class="togglebutton-wrapper" v-bind:class="isactive ? 'togglebutton-checked' : ''">
        <label v-bind:for="name">
            <span class="togglebutton-label">{{ label }}</span>
            <span class="tooglebutton-box"></span>
        </label>
        <input v-bind:id="name" type="checkbox" v-bind:name="name" v-model="isactive" v-on:change="onToogle">
    </div>`,
    model: {
        prop: 'checked',
        event: 'change'
    },
    data: function () {
        return {
            isactive: false
        }
    },
    methods: {
        onToogle: function () {
            this.$emit('clicked', this.isactive)
        }
    }
});

var todolist = new Vue({
    el: '.dowebok',
    data: {
        newitem: '',
        sortByStatus: false,
        todo: 
            { id: 1, label: "快要发工资啦", done: false , day: 0, minute: 0, second: 0, mark: 10, hours : 0}
    },
    methods: {
        // addItem: function () {
        //     this.todo.push({ id: Math.floor(Math.random() * 9999) + 10, label: this.newitem, done: false });
        //     this.newitem = '';
        // },
        // markAsDoneOrUndone: function (item) {
        //     item.done = !item.done;
        // },
        // deleteItemFromList: function (item) {
        //     let index = this.todo.indexOf(item)
        //     this.todo.splice(index, 1);
        // },
        // clickontoogle: function (active) {
        //     this.sortByStatus = active;
        // },
        get() {
            let now = new Date();
            let nowDay = now.getDate();

            let nowMilliseconds = now.getTime();
            now.setDate(this.todo.mark);
            if (nowDay ==this.todo.mark) {
                Vue.set(todolist.todo, 'label', "今天发工资！！！！！");
                Vue.set(todolist.todo, 'done', true);
                return;
            } else {
                Vue.set(todolist.todo, 'done', false);
                Vue.set(todolist.todo, 'label', "快要发工资啦");
            }

            if (nowDay > this.todo.mark) {
                now.setMonth(now.getMonth() + 1);
            }

            now.setHours(0);
            now.setMinutes(0);
            now.setSeconds(0);
            now.setMilliseconds(0);
            let markMilliseconds = now.getTime();

            let time = markMilliseconds - nowMilliseconds;
        
            Vue.set(todolist.todo, 'second', Math.ceil(time/1000));
             Vue.set(todolist.todo, 'minute', Math.ceil(this.todo.second/60));
            Vue.set(todolist.todo, 'hours', Math.ceil(this.todo.minute/60 ));
           Vue.set(todolist.todo, 'day',Math.ceil(this.todo.hours/24));
        }

    },
    mounted() {
      this.timer = setInterval(this.get, 100);
    },
    computed: {
        todoByStatus: function () {

            if (!this.sortByStatus) {
                return this.todo;
            }

            var sortedArray = []
            var doneArray = this.todo.filter(function (item) { return item.done; });
            var notDoneArray = this.todo.filter(function (item) { return !item.done; });

            sortedArray = [...notDoneArray, ...doneArray];
            return sortedArray;
        }
    }
});


// let future = new Date()+1000;
// let now = new Date();

// const timer = setInterval(()=>{
//     if(future>now){
//         future--;
//     }else {
//         clearInterval(timer)
//     }
// },1000);