/**
 * Polyfills for older browsers
 */

// structuredClone polyfill (Chrome 98+, Firefox 94+, Safari 15.4+)
if (typeof structuredClone === 'undefined') {
    console.warn('structuredClone not available, using polyfill');

    window.structuredClone = function(obj) {
        // 使用 JSON 序列化作为简单的深拷贝实现
        // 注意: 这个实现有局限性,不支持 Date, RegExp, Function 等特殊对象
        // 但对于配置对象来说通常足够了
        try {
            return JSON.parse(JSON.stringify(obj));
        } catch (err) {
            console.error('structuredClone polyfill error:', err);
            // 如果 JSON 方法失败,尝试使用更完整的深拷贝
            return deepClone(obj);
        }
    };

    // 更完整的深拷贝实现
    function deepClone(obj, hash = new WeakMap()) {
        // 处理 null 和 undefined
        if (obj === null || obj === undefined) return obj;

        // 处理基本类型
        if (typeof obj !== 'object') return obj;

        // 处理循环引用
        if (hash.has(obj)) return hash.get(obj);

        // 处理 Date
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }

        // 处理 RegExp
        if (obj instanceof RegExp) {
            return new RegExp(obj.source, obj.flags);
        }

        // 处理 Array
        if (Array.isArray(obj)) {
            const cloneArr = [];
            hash.set(obj, cloneArr);
            obj.forEach((item, index) => {
                cloneArr[index] = deepClone(item, hash);
            });
            return cloneArr;
        }

        // 处理普通对象
        const cloneObj = Object.create(Object.getPrototypeOf(obj));
        hash.set(obj, cloneObj);

        Object.keys(obj).forEach(key => {
            cloneObj[key] = deepClone(obj[key], hash);
        });

        return cloneObj;
    }
}
