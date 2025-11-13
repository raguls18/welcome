// // """
//    Algorithm:

// Start the program.

// Read the input file which contains two numbers per line separated by space.

// Mapper Phase:

// Split each line into two numbers.

// Add the two numbers.

// Emit key as "Sum" and value as the result.

// Reducer Phase:

// Collect all values for the key "Sum".

// Add all the mapper outputs to get the final sum.

// Output the key "Final Sum" with the total value.

// Stop the program.     


import java.io.IOException;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;

public class AddTwoNumbers {

    public static class Map extends Mapper<LongWritable, Text, Text, IntWritable> {
        public void map(LongWritable key, Text value, Context context)
                throws IOException, InterruptedException {
            String[] num = value.toString().split(" ");
            int sum = Integer.parseInt(num[0]) + Integer.parseInt(num[1]);
            context.write(new Text("Sum"), new IntWritable(sum));
        }
    }

    public static class Reduce extends Reducer<Text, IntWritable, Text, IntWritable> {
        public void reduce(Text key, Iterable<IntWritable> values, Context context)
                throws IOException, InterruptedException {
            int total = 0;
            for (IntWritable val : values)
                total += val.get();
            context.write(new Text("Final Sum"), new IntWritable(total));
        }
    }
}
