import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupInput: LoginInput) {
    const { email, password } = signupInput;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) throw new UnauthorizedException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    const user = await this.userRepository.save(newUser);

    return {
      access_token: this.jwtService.sign({
        id: user.id,
        email: user.email,
      }),
      user,
    };
  }

  async login(loginInput: LoginInput) {
    const { email, password } = loginInput;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Login details are incorrect');

    return {
      access_token: this.jwtService.sign({ id: user.id, email: user.email }),
      user,
    };
  }
}
