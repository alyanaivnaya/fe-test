window.ToDoList = React.createClass({

    items: [
        {
            id: 1,
            name: 'ToDo item 1'
        }, {
            id: 2,
            name: 'ToDo item 2'
        }, {
            id: 3,
            name: 'ToDo item 3'
        }, {
            id: 4,
            name: 'ToDo item 4'
        }, {
            id: 5,
            name: 'ToDo item 5'
        },
    ],
  
    getLastId: function() {
        var lastId = 0;
        this.items.forEach(function(el) {
            if (el.id > lastId) {
                lastId = el.id;
            }
        })
        return lastId;
    },

    getInitialState: function() {
        return {
            displayedItems: this.items
        };
    },

    handleSearch: function(event) {
        var searchQuery = event.target.value.toLowerCase();
        var displayedItems = this.items.filter(function(el) {
            var searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });

        this.setState({
            displayedItems: displayedItems,
            searchQ: event.target.value
        });
    },

    newItem: function(event) {
        this.setState({
            newItem: event.target.value
        });
    },

    addItem: function(event) {
        var newItem = this.state.newItem;
        var newId = (this.getLastId()) + 1;
        if (newItem && confirm('Are you sure you want to add new ToDo item: ' + newItem + '?')) {
            this.items.push({id: newId, name: newItem});
            newItem = '';
            var displayedItems = this.items;
            this.setState({
                displayedItems: displayedItems,
                newItem: '',
                searchQ: ''
            });
        }
            event.preventDefault();
    },

    delItem: function(event) {
        if (confirm('Are you sure you want to delete this item?')) {
            var displayedItems = this.state.displayedItems.filter(function(el) {
                return parseInt(event.target.attributes.id.value) !== el.id;
            });
            this.items.forEach(function(el, index, arr) {
                if (parseInt(event.target.attributes.id.value) == el.id) {
                    arr.splice(index,1);
                }
            })
            this.setState({
                displayedItems: displayedItems
            });
        }
    },    

    createItem: function(el) {
        return <Item
                key={el.id}
                id={el.id}
                name={el.name}
                delItem={this.delItem}
            />;
    },

    render: function() {
        return (
            <div className="todolist">
                <div className="header">ToDO List</div>
                <input type="text" className="searchfield" placeholder="I'm looking for..." onChange={this.handleSearch} value={this.state.searchQ}/>
                <div className="list">
                    {
                        this.state.displayedItems.map(this.createItem)
                    }
                </div>
                <form className="subm" onSubmit={this.addItem}>
                    <input className="txt" type="text" placeholder="ToDo text" onChange={this.newItem} value={this.state.newItem}/>
			        <button className="btn">Add</button>
                </form>
            </div>
        );
    }
});