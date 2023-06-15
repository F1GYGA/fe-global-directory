import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface Option {
  value: string;
  viewValue: string;
}

interface CategoryOptionsGroup {
  disabled?: boolean;
  category: string;
  options: Option[];
}

@Component({
  selector: 'app-search-colleagues',
  templateUrl: './search-colleagues.component.html',
  styleUrls: ['./search-colleagues.component.css']
  
})
export class SearchColleaguesComponent implements OnInit {

  constructor() { }
  colleagues: any[] = [
    {
      profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
      firstName: 'coleg1',
      lastName: 'coleg1',
      department: 'Department1',
      skills: 'skill1,skill2,skill3',
      team: 'Team1',
      email: 'example@example.com'
    },
    {
      profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
      firstName: 'coleg1',
      lastName: 'coleg1',
      department: 'Department1',
      skills: 'skill1,skill2,skill3',
      team: 'Team1',
      email: 'example@example.com'
    },
    {
      profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
      firstName: 'coleg1',
      lastName: 'coleg1',
      department: 'Department1',
      skills: 'skill1,skill2,skill3',
      team: 'Team1',
      email: 'example@example.com'
    },
    {
      profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
      firstName: 'coleg1',
      lastName: 'coleg1',
      department: 'Department1',
      skills: 'skill1,skill2,skill3',
      team: 'Team1',
      email: 'example@example.com'
    },
    {
      profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
      firstName: 'coleg1',
      lastName: 'coleg1',
      department: 'Department1',
      skills: 'skill1,skill2,skill3',
      team: 'Team1',
      email: 'example@example.com'
    },
    {
      profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
      firstName: 'coleg1',
      lastName: 'coleg1',
      department: 'Department1',
      skills: 'skill1,skill2,skill3',
      team: 'Team1',
      email: 'example@example.com'
    },{
      profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
      firstName: 'coleg1',
      lastName: 'coleg1',
      department: 'Department1',
      skills: 'skill1,skill2,skill3',
      team: 'Team1',
      email: 'example@example.com'
    },
    {
      profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
      firstName: 'coleg1',
      lastName: 'coleg1',
      department: 'Department1',
      skills: 'skill1,skill2,skill3',
      team: 'Team1',
      email: 'example@example.com'
    },
    {
      profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC',
      firstName: 'coleg1',
      lastName: 'coleg1',
      department: 'Department1',
      skills: 'skill1,skill2,skill3',
      team: 'Team1',
      email: 'example@example.com'
    }
    
  ];

  categoryControl = new FormControl();
  categoryGroup: CategoryOptionsGroup[] = [
    {
      category: 'Department',
      options: [
        {value: 'Department1', viewValue: 'Department1'},
        {value: 'Department2', viewValue: 'Department2'},
        {value: 'Department3', viewValue: 'Department3'}
      ]
    },
    {
      category: 'Team',
      options: [
        {value: 'Team1', viewValue: 'Team1'},
        {value: 'Team2', viewValue: 'Team2'},
        {value: 'Team3', viewValue: 'Team3'}
      ],
    },
    {
      category: 'Skills',
      options: [
        {value: 'Skill1', viewValue: 'Skill1'},
        {value: 'Skill2', viewValue: 'Skill2'},
        {value: 'Skill3', viewValue: 'Skill3'}
      ],
    },  
  ];

  searchColleaguesFormControl = new FormControl();

  searchForm = new FormGroup({
    searchedColleague: this.searchColleaguesFormControl, 
  });

  ngOnInit(): void {
  }


  // updateOptions() {
  //   const category = (document.getElementById("category") as HTMLSelectElement).value;
  //   const optionSelect = document.getElementById("option") as HTMLSelectElement;

  //   // Clear existing options
  //   optionSelect.innerHTML = "";

  //   // Add new options based on the selected category
  //   const categoryOptions = this.options[category];
  //   if (categoryOptions) {
  //     for (let i = 0; i < categoryOptions.length; i++) {
  //       const option = document.createElement("option");
  //       option.value = categoryOptions[i];
  //       option.textContent = categoryOptions[i];
  //       optionSelect.appendChild(option);
  //     }
  //   }

  //   this.updateInput();

  // }
  //   updateInput() {
  //   const category = (document.getElementById("category") as HTMLSelectElement).value;
  //   const option = (document.getElementById("option") as HTMLSelectElement).value;

  //   const input = document.getElementById("selected-option") as HTMLInputElement;
  //   input.value = option !== "all" ? category + " - " + option : category;
  // }
}
