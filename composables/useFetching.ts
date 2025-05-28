import type {Ref} from 'vue';
import {ref, watch} from 'vue';

interface UseFetchingOptions {
    immediate?: boolean;
}

export function useFetching<T>(
    apiFunc: () => Promise<T>,
    keys: Ref<any>[],
    options: UseFetchingOptions = {immediate: true}
) {
    const {immediate = true} = options;

    const loading = ref(false);
    const error = ref<string | null>(null);
    const data = ref<T | null>(null);
    const isSuccess = ref(false);

    async function fetchData() {
        loading.value = true;
        error.value = null;
        isSuccess.value = false;

        try {
            data.value = await apiFunc();
            isSuccess.value = true;
        } catch (err: any) {
            error.value = err.message || 'Unknown error';
            data.value = null;
            isSuccess.value = false;
        } finally {
            loading.value = false;
        }
    }

    watch(
        keys,
        () => {
            fetchData();
        },
        {immediate, deep: true}
    );

    return {
        loading,
        error,
        data,
        isSuccess,
        fetchData,
    };
}
