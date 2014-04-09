var Toolkit = {
    each: function (list, iterator, context) {
        if (list === null) return list;
        if (Array.isArray(list)) {
            for (i = 0, l = list.length; i < l; i++)
            iterator.call(context, list[i], i, list);
        } else {
            for (var item in list)
            iterator.call(context, list[item], item, list);
        }
        return list;
    },
    map: function (list, iterator, context) {
        var arr = [];
        if (list === null) return arr;
        this.each(list, function (value, index, list) {
            arr.push(iterator.call(context, value, index, list));
        }, context);
        return arr;
    },
    reduce: function (list, iterator, memo, context) {
        if (list === null) return list;
        this.each(list, function (value, index, list) {
            if (memo === undefined) memo = value;
            else memo = iterator.call(context, memo, value, index, list);
        });
        return memo;
    },
    reduceRight: function (list, iterator, memo, context) {
        if (list === null) return list;
        store = [];
        if (Array.isArray(list)) store = list;
        else for (var item in list) {
            store.push(item);
        }
        return this.reduce(store.reverse(), iterator, memo, context);
    },
    some: function (list, predicate, context) {
        result = false;
        this.each(list, function (value, index, list) {
            if (result || result = predicate.call(context, value, index, list)) return [];            
        }, context);
        return !!result;
    }
};