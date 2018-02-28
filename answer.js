let sortedArray = ()=>{
    let data = [
        {
            "id": 0,
            "name": "Node 0",
            "thumbnail": {
                "description": "Random Picture",
                "href": "https://picsum.photos/200/200/?random&a"
            },
            "parent": null
        },
        {
            "id": 1,
            "name": "Node 1",
            "thumbnail": {
                "description": "Another Random Picture",
                "href": "https://picsum.photos/200/200/?random&b"
            },
            "parent": 0
        },
        {
            "id": 2,
            "name": "Node 2",
            "thumbnail": {
                "description": "A Picture Is Random",
                "href": "https://picsum.photos/200/200/?random&c"
            },
            "parent": null
        },
        {
            "id": 3,
            "name": "Node 3",
            "thumbnail": {
                "description": "Picture, Random",
                "href": "https://picsum.photos/200/200/?random&d"
            },
            "parent": 1
        },
        {
            "id": 4,
            "name": "Node 4",
            "thumbnail": {
                "description": "rand(pix)",
                "href": "https://picsum.photos/200/200/?random&e"
            },
            "parent": 5
        },
        {
            "id": 5,
            "name": "Node 5",
            "thumbnail": {
                "description": "pickPix <- rand",
                "href": "https://picsum.photos/200/200/?random&f"
            },
            "parent": null
        }
    ],
        myA = this;

    myA.childrenWithoutParentInMainArray = data.filter(item => item.parent !== null);
    myA.mainArray = data.filter(item => item.parent === null);
    myA.childrenWithParentInMainArray = [];

    myA.findParentFilter = ()=>{
        return myA.childrenWithoutParentInMainArray.filter(childItem => {
            let parentIdExistInMainArrayIndex = myA.mainArray.findIndex(mainItem => {
                return mainItem.id === childItem.parent;
            });
            return parentIdExistInMainArrayIndex > -1;
        });
    };
    myA.moveToMainArray = ()=>{
        for (let childItem of myA.childrenWithParentInMainArray){
            mainArray.push(childItem);
            myA.removeFromchildrenWithoutParentInMainArray(childItem);
        }
        myA.childrenWithParentInMainArray = [];
    };

    myA.removeFromchildrenWithoutParentInMainArray = (childItem)=>{
        let childIndex = myA.childrenWithoutParentInMainArray.findIndex(item => {
            return item.id === childItem.id;
        })
        if (childIndex > -1){
            myA.childrenWithoutParentInMainArray.splice(childIndex, 1);
        }
    };

    myA.sortingArray = ()=>{
        myA.childrenWithParentInMainArray = myA.findParentFilter();
        myA.moveToMainArray();

        if (myA.childrenWithoutParentInMainArray.length > 0){
            myA.sortingArray();
        }
    };

    myA.sortingArray();

    return myA.mainArray;
};

let template = $('#itemTemplate').html(),
    array = sortedArray(),
    $body = $('body');

for (let item of array){
    let newItem = template.replace(/{{id}}/g, item.id);
    newItem = newItem.replace('{{href}}', item.thumbnail.href);
    newItem = newItem.replace(/{{description}}/g, item.thumbnail.description);
    newItem = newItem.replace('{{name}}', item.name);

    if (item.parent === null){
        $body.append($(newItem));
    } else {
        let $parent = $('#'+item.parent);
        $parent.find('.container').addClass('pointer');
        $parent.find('.child-indicator').removeClass('hide');
        $parent.find('.child').append($(newItem))
    }
};

function childToggle(ev, id){
    ev.preventDefault();
    ev.stopPropagation();
    let $element = $('#'+id);
    $element.find('.child').toggleClass('hide');
    $element.find('.right-indicator').toggleClass('hide');
    $element.find('.left-indicator').toggleClass('hide');
}
