#include "array.h"
#include <stdio.h>
#include <stdlib.h>

Array array_create(int init_size) {
	Array a;
	a.size  = init_size;
	a.array = (int*)malloc(init_size*sizeof(int));
	return a;
}

void array_free(Array *a) {
	free(a -> array);
	a->array = NULL;
	a->size = 0;
}

int array_size(const Array *a) {
	return a -> size;
}

int* array_at(Array *a, int index) {
	return &(a->array[index]);
}

void array_inflate(Array *a, int more_size) {
	int new_size = more_size + a->size;
	int *p = (int*)malloc(sizeof(int)*new_size);
	for (int i = 0; i < a->size; ++i)
	{
		p[i] = a->array[i];
	}
	free(a->array);
	a->array = p;
	a->size = new_size;
}

int main(int argc, char const *argv[])
{
	Array a = array_create(5);
	*array_at(&a, 0) = 10;

	array_inflate(&a, 4);

	printf("%d\n", array_size(&a));
	printf("%d\n", *array_at(&a, 0));

	array_free(&a);
	return 0;
}
