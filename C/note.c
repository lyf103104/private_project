#include <stdio.h>

int main(int argc, char const *argv[])
{
	// int
	// short
	// long
	// unsigned
	// unsigned short
	// unsigned long

	// %d  %o  %x   -> int
	// %ld %lo %lx  -> long
	// %u  %o  %x   -> unsigned
	// %lu %lo %lx  -> unsigned long

	/* input float and double */
	// %f   -> float
	// %e   -> double
	/* output float and double */
	// %f   -> float
	// %e   -> float
	// %lf  -> double
	// %le  -> double

	// char 0 ~ 255

	// malloc(unsigned size)
	// calloc(unsigned n, unsigned size)
	// free(void *p)
	// realloc(void *p, unsigned size)

	// int *a;
	// a = (int*)malloc(n * sizeof(int));
	// free(a);

	// int * const w
	// const int *w

	// T worst(n) 最坏情况复杂度
	// T avg(n)   平均复杂度

	// T(n) = O(f(n)) -> f(n) 表现的是 T(n) 的上界
	// T(n) = O(f(n)) 表示 f(n) 是 T(n) 的某种上界

	// T(n) = Ω(g(n)) 表示 g(n) 是 T(n) 的某种下界
	// T(n) = Θ(h(n))

	// 常熟级别  1
	// 对数级别 log n
	// 线性级别 n
	// 线性对数级别 n log n
	// 平方级别 n2
	// 立方级别 n3
	// 指数级别 2n

	// 当 N >= 2 的时候，f(n) = n^2 总是大于 T(n) = n + 2 的，于是我们说 f(n) 的增长速度是大于或者等于 T(n) 的，也说 f(n) 是 T(n) 的上界，可以表示为 T(n) = O(f(n))。
	// 因为f(n) 的增长速度是大于或者等于 T(n) 的，即T(n) = O(f(n))，所以我们可以用 f(n) 的增长速度来度量 T(n) 的增长速度，所以我们说这个算法的时间复杂度是 O(f(n))。

	/*
		a^b = c
		b = log(a)(c)
		*** log 对数公式
		2^x = 8 -> x=3
		x = log(2)(8)
		时间复杂度 : https://www.jianshu.com/p/f4cca5ce055a
	*/



	return 0;
}