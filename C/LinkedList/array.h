#ifndef _ARRAY_H_
#define _ARRAY_H_

typedef struct {
	int *array;
	int size;
} Array;

/* 创建数组 */
Array array_create(int init_size);
/* 释放数组内存 */
void array_free(Array *a);
/* 数组大小 */
int array_size(const Array *a);
int* array_at(Array *a, int index);
void array_inflate(Array *a, int more_size);

#endif