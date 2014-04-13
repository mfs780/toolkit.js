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
    find: function (list, predicate, context) {
        var result;
        if (list === null) return result;
        this.some(list, function (value, index, list) {
            if (predicate.call(context, value, index, list)) {
                result = value;
                return true;
            }
        }, context);
        return result;
    },
    filter: function (list, predicate, context) {
        var result = [];
        if (list === null) return result;
        this.each(list, function (value, index, list) {
            if (predicate.call(context, value, index, list)) {
                result.push(value);
            }
        }, context);
        return result;
    },
    where: function (list, properties) {
        if (list === null) return [];
        return this.filter(list, function (value, index, list) {
            var result = true;
            for (var p in properties) {
                if (properties[p] !== value[p]) {
                    result = false;
                }
            }
            return result;
        });
    },
    findWhere: function (list, properties) {
        if (list === null) return result;
        return this.find(list, function (value, index, list) {
            var result = true;
            for (var p in properties)
            if (properties[p] !== value[p]) result = false;
            return result;
        });
    },
    reject: function (list, predicate, context) {
        if (list === null) return [];
        return this.filter(list, function (value, index, list) {
            return !predicate.call(context, value, index, list);
        }, context);
    },
    every: function (list, predicate, context) {
        if (list === this.filter(list, predicate, context)) return true;
        else return false;
    },
    some: function (list, predicate, context) {
        var result = false;
        this.each(list, function (value, index, list) {
            if (result || (result = predicate.call(context, value, index, list))) return [];
        }, context);
        return !!result;
    },
    contains: function (list, value) {
        if (list === null) return false;
        result = false;
        this.some(list, function (v, index, list) {
            if (v === value) result = true;
        });
        return result;
    },
    invoke: function (list, methodName) {
        var args = Array.prototype.slice.call(arguments, 2);
        var isFunc = _.isFunction(methodName);
        return Toolkit.map(list, function (value) {
            return (isFunc ? method : value[methodName]).apply(value, args);
        });
    }
};