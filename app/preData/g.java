public class g {

    public static int solution(int [] nums, int k ){
        int i = 0 ; 
        int j = nums.length -1 ; 
        int count = 0  ;
            for (int l = 0; l < nums.length; l++) {
                    for (int l2 = 0; l2 < nums.length; l2++) {
                        if (nums[i]==nums[j] && (i*j)/k == 0 ) {
                            count++ ;
                            j-- ;
                        }
                        else{
                            j-- ;
                        }
                    }
                    for (int l2 = 0; l2 < nums.length; l2++) {
                        if (nums[i]==nums[j] && (i*j)/k== 0 ) {
                            count++ ;
                            i++ ;
                        }
                        else{
                            i++ ;
                        }
                    }
            }
            return count ;
    }

    public static void main(String[] args) {
        int [] arr = {1,3,3,4,2,2} ; 
        int ksa = 2 ;
        System.out.println(solution(arr, ksa));
       

    }
}